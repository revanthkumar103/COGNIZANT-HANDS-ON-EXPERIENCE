import org.junit.After;
import static org.junit.Assert.assertEquals;
import org.junit.Before;
import org.junit.Test;

public class CalculatorTest {

    private Calculator calculator;

    @Before
    public void setUp() {
        calculator = new Calculator();
        System.out.println("Setup executed");
    }

    @After
    public void tearDown() {
        calculator = null;
        System.out.println("Teardown executed");
    }

    @Test
    public void testAdd() {

        int a = 10;
        int b = 20;

        int result = calculator.add(a, b);

        assertEquals(30, result);
    }

    @Test
    public void testAddWithNegativeNumbers() {
        int result = calculator.add(-5, -10);
        assertEquals(-15, result);
    }

    @Test
    public void testAddWithMixedNumbers() {
        int result = calculator.add(15, -5);
        assertEquals(10, result);
    }

    @Test
    public void testAddWithZero() {
        int result = calculator.add(100, 0);
        assertEquals(100, result);
    }
}