// ===== Step 2: Document interface =====
interface Document {
    void open();
}

// ===== Step 3: Concrete document classes =====
class WordDocument implements Document {
    public void open() {
        System.out.println("Opening a Word document...");
    }
}

class PdfDocument implements Document {
    public void open() {
        System.out.println("Opening a PDF document...");
    }
}

class ExcelDocument implements Document {
    public void open() {
        System.out.println("Opening an Excel document...");
    }
}

// ===== Step 4: Abstract factory with the "factory method" =====
abstract class DocumentFactory {
    // This is THE factory method — subclasses decide what gets created
    public abstract Document createDocument();
}

// One concrete factory per document type
class WordDocumentFactory extends DocumentFactory {
    public Document createDocument() {
        return new WordDocument();
    }
}

class PdfDocumentFactory extends DocumentFactory {
    public Document createDocument() {
        return new PdfDocument();
    }
}

class ExcelDocumentFactory extends DocumentFactory {
    public Document createDocument() {
        return new ExcelDocument();
    }
}

// ===== Step 5: Test class =====
public class FactoryMethodPatternExample {
    public static void main(String[] args) {

        DocumentFactory factory;
        Document doc;

        // Ask the Word factory for a document — caller never wrote "new WordDocument()"
        factory = new WordDocumentFactory();
        doc = factory.createDocument();
        doc.open();

        factory = new PdfDocumentFactory();
        doc = factory.createDocument();
        doc.open();

        factory = new ExcelDocumentFactory();
        doc = factory.createDocument();
        doc.open();
    }
}