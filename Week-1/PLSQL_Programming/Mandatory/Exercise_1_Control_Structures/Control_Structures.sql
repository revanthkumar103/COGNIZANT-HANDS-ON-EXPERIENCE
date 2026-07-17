SET SERVEROUTPUT ON;

-- Scenario 1: Apply 1% loan interest discount to customers over 60
DECLARE
    v_age NUMBER;
BEGIN
    FOR cust IN (SELECT CustomerID, Name, DOB FROM Customers) LOOP
        v_age := TRUNC(MONTHS_BETWEEN(SYSDATE, cust.DOB) / 12);

        IF v_age > 60 THEN
            UPDATE Loans
            SET InterestRate = InterestRate - (InterestRate * 0.01)
            WHERE CustomerID = cust.CustomerID;

            DBMS_OUTPUT.PUT_LINE(cust.Name || ' (age ' || v_age || ') got a 1% loan discount.');
        END IF;
    END LOOP;
    COMMIT;
END;
/

-- Scenario 2: Flag customers with balance > $10,000 as VIP
ALTER TABLE Customers ADD IsVIP VARCHAR2(5) DEFAULT 'FALSE';

DECLARE
BEGIN
    FOR cust IN (SELECT CustomerID, Name, Balance FROM Customers) LOOP
        IF cust.Balance > 10000 THEN
            UPDATE Customers
            SET IsVIP = 'TRUE'
            WHERE CustomerID = cust.CustomerID;

            DBMS_OUTPUT.PUT_LINE(cust.Name || ' promoted to VIP (balance: ' || cust.Balance || ')');
        END IF;
    END LOOP;
    COMMIT;
END;
/

-- Scenario 3: Remind customers whose loans are due within 30 days
DECLARE
BEGIN
    FOR loan IN (
        SELECT l.LoanID, l.EndDate, c.Name
        FROM Loans l
        JOIN Customers c ON l.CustomerID = c.CustomerID
        WHERE l.EndDate BETWEEN SYSDATE AND SYSDATE + 30
    ) LOOP
        DBMS_OUTPUT.PUT_LINE('REMINDER: ' || loan.Name ||
            ', your loan (ID ' || loan.LoanID || ') is due on ' ||
            TO_CHAR(loan.EndDate, 'DD-MON-YYYY'));
    END LOOP;
END;
