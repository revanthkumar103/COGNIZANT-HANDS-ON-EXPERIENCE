// ===== Step 2: Product class =====
class Product {
    int productId;
    String productName;
    String category;

    public Product(int productId, String productName, String category) {
        this.productId = productId;
        this.productName = productName;
        this.category = category;
    }

    public void display() {
        System.out.println("ID: " + productId + ", Name: " + productName + ", Category: " + category);
    }
}

// ===== Step 3: Search algorithms =====
class SearchAlgorithms {

    // Linear search — works on ANY array, sorted or not.
    // Checks every element one by one until found (or reaches the end).
    public static Product linearSearch(Product[] products, int targetId) {
        for (int i = 0; i < products.length; i++) {
            if (products[i].productId == targetId) {
                return products[i];   // found it — stop early
            }
        }
        return null;   // not found after checking everything
    }

    // Binary search — REQUIRES the array to be sorted by productId beforehand.
    public static Product binarySearch(Product[] sortedProducts, int targetId) {
        int low = 0;
        int high = sortedProducts.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;   // middle index of current search range

            if (sortedProducts[mid].productId == targetId) {
                return sortedProducts[mid];               // found it
            } else if (sortedProducts[mid].productId < targetId) {
                low = mid + 1;                             // target is in the right half
            } else {
                high = mid - 1;                            // target is in the left half
            }
        }
        return null;   // low > high means the range collapsed — not found
    }
}

// ===== Test class =====
public class EcommerceSearchExample {
    public static void main(String[] args) {

        // Unsorted array — fine for linear search
        Product[] products = {
            new Product(105, "Wireless Mouse", "Electronics"),
            new Product(102, "Yoga Mat", "Fitness"),
            new Product(110, "Bluetooth Speaker", "Electronics"),
            new Product(101, "Water Bottle", "Fitness"),
            new Product(108, "Desk Lamp", "Home")
        };

        // Sorted array — REQUIRED for binary search to work correctly
        Product[] sortedProducts = products.clone();
        java.util.Arrays.sort(sortedProducts, (a, b) -> a.productId - b.productId);

        System.out.println("--- Linear Search for ID 108 ---");
        Product resultLinear = SearchAlgorithms.linearSearch(products, 108);
        if (resultLinear != null) resultLinear.display();
        else System.out.println("Not found.");

        System.out.println("\n--- Binary Search for ID 108 (on sorted array) ---");
        Product resultBinary = SearchAlgorithms.binarySearch(sortedProducts, 108);
        if (resultBinary != null) resultBinary.display();
        else System.out.println("Not found.");
    }
}