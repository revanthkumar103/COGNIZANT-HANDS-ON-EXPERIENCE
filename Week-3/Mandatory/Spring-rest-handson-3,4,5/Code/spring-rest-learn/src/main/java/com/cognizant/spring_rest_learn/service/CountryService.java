package com.cognizant.spring_rest_learn.service;

import java.util.List;

import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

import com.cognizant.spring_rest_learn.model.Country;

@Service
public class CountryService {

    public Country getCountry(String code) {

        ClassPathXmlApplicationContext context =
                new ClassPathXmlApplicationContext("country.xml");

        List<Country> countries = context.getBean("countryList", List.class);

        for (Country country : countries) {
            if (country.getCode().equalsIgnoreCase(code)) {
                context.close();
                return country;
            }
        }

        context.close();
        return null;
    }
}