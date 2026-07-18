package com.library.service;

import com.library.repository.BookRepository;

public class BookService {
    private BookRepository bookRepository;

    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public void showMessage() {
        System.out.println("BookService bean loaded successfully.");
        bookRepository.showMessage();
    }
}