public class FinancialForecastExample {

    // Step 2 & 3: recursive future value calculator
    // principal   = starting amount
    // growthRate  = e.g. 0.08 for 8% annual growth
    // year        = how many years forward to project (counts down each call)
    public static double futureValue(double principal, double growthRate, int year) {

        // Base case: year 0 means "today" — no growth applied yet
        if (year == 0) {
            return principal;
        }

        // Recursive case: this year's value = (last year's value) grown by one more year
        return futureValue(principal, growthRate, year - 1) * (1 + growthRate);
    }

    public static void main(String[] args) {
        double initialInvestment = 10000.0;
        double annualGrowthRate = 0.08;   // 8% growth per year
        int years = 5;

        for (int y = 0; y <= years; y++) {
            double value = futureValue(initialInvestment, annualGrowthRate, y);
            System.out.printf("Year %d: $%.2f%n", y, value);
        }
    }
}