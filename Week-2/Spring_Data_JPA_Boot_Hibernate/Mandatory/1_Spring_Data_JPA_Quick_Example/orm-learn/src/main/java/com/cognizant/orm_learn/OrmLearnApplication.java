package com.cognizant.ormlearn;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.cognizant.ormlearn.model.Country;
import com.cognizant.ormlearn.service.CountryService;

@SpringBootApplication
public class OrmLearnApplication {

    private static final Logger LOGGER = LoggerFactory.getLogger(OrmLearnApplication.class);
    private static CountryService countryService;

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(OrmLearnApplication.class, args);
        LOGGER.info("Inside main");
        countryService = context.getBean(CountryService.class);

        testGetAllCountries();
        testFindCountryByCode();
        testAddCountry();
        testUpdateCountry();
        testDeleteCountry();
    }

    private static void testGetAllCountries() {
        LOGGER.info("Start - getAllCountries");
        List<Country> countries = countryService.getAllCountries();
        LOGGER.info("countries={}", countries);
        LOGGER.info("End - getAllCountries");
    }

    private static void testFindCountryByCode() {
        LOGGER.info("Start - findCountryByCode");
        Country country = countryService.findCountryByCode("IN");
        LOGGER.info("Country:{}", country);
        LOGGER.info("End - findCountryByCode");
    }

    private static void testAddCountry() {
        LOGGER.info("Start - addCountry");
        countryService.addCountry(new Country("DE", "Germany"));
        Country added = countryService.findCountryByCode("DE");
        LOGGER.info("Added country:{}", added);
        LOGGER.info("End - addCountry");
    }

    private static void testUpdateCountry() {
        LOGGER.info("Start - updateCountry");
        countryService.updateCountry("DE", "Deutschland");
        Country updated = countryService.findCountryByCode("DE");
        LOGGER.info("Updated country:{}", updated);
        LOGGER.info("End - updateCountry");
    }

    private static void testDeleteCountry() {
        LOGGER.info("Start - deleteCountry");
        countryService.deleteCountry("DE");
        LOGGER.info("End - deleteCountry");
    }
}