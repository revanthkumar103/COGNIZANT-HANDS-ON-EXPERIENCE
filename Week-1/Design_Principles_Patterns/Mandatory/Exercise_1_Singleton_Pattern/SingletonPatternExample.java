// Logger.java equivalent — kept package-private (no "public") since it shares this file
class Logger {

    private static Logger instance;

    private Logger() {
        System.out.println("Logger instance created.");
    }

    public static Logger getInstance() {
        if (instance == null) {
            instance = new Logger();
        }
        return instance;
    }

    public void log(String message) {
        System.out.println("LOG: " + message);
    }
}

// This is the public class — must match the file name exactly
public class SingletonPatternExample {
    public static void main(String[] args) {
        Logger logger1 = Logger.getInstance();
        Logger logger2 = Logger.getInstance();

        logger1.log("First message");
        logger2.log("Second message");

        if (logger1 == logger2) {
            System.out.println("SUCCESS: Only one instance exists.");
        } else {
            System.out.println("FAILURE: Multiple instances were created.");
        }
    }
}
