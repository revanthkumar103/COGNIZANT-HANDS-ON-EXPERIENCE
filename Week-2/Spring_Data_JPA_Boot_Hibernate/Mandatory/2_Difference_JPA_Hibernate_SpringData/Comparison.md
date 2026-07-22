# JPA vs Hibernate vs Spring Data JPA

## JPA
- Specification only (JSR 338)
- Defines annotations like @Entity, @Id, @Column
- No concrete implementation

## Hibernate
- ORM tool that implements the JPA specification
- Requires manual session/transaction management

### Hibernate example — adding an employee
    public Integer addEmployee(Employee employee) {
        Session session = factory.openSession();
        Transaction tx = null;
        Integer employeeID = null;
        try {
            tx = session.beginTransaction();
            employeeID = (Integer) session.save(employee);
            tx.commit();
        } catch (HibernateException e) {
            if (tx != null) tx.rollback();
            e.printStackTrace();
        } finally {
            session.close();
        }
        return employeeID;
    }

## Spring Data JPA
- Abstraction layer above a JPA implementation (typically Hibernate)
- Eliminates session/transaction boilerplate
- Auto-generates repository method implementations

### Spring Data JPA example — same operation
    public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    }

    @Autowired
    private EmployeeRepository employeeRepository;

    @Transactional
    public void addEmployee(Employee employee) {
        employeeRepository.save(employee);
    }

## Summary
Our own `CountryRepository` (Exercise 1) is a direct real-world example: extending
`JpaRepository<Country, String>` gave us `findAll()`, `findById()`, `save()`, and
`deleteById()` with zero implementation code — Spring Data JPA generated all of it
at runtime, on top of Hibernate as the underlying JPA provider.cd