package com.exampleback.demo;

import com.exampleback.demo.model.DeveloperMetric;
import com.exampleback.demo.repository.DeveloperMetricRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final DeveloperMetricRepository repository;

    public DataInitializer(DeveloperMetricRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() == 0) {
            repository.saveAll(List.of(
                new DeveloperMetric(null, "Francisco", LocalDate.of(2026, 5, 1), 12, 2, 5, 8),
                new DeveloperMetric(null, "Francisco", LocalDate.of(2026, 5, 2), 18, 1, 7, 13),
                new DeveloperMetric(null, "Francisco", LocalDate.of(2026, 5, 3), 15, 3, 6, 10),
                new DeveloperMetric(null, "Francisco", LocalDate.of(2026, 5, 4), 22, 0, 8, 15),
                new DeveloperMetric(null, "Pedro",     LocalDate.of(2026, 5, 1), 9,  1, 4, 6),
                new DeveloperMetric(null, "Pedro",     LocalDate.of(2026, 5, 2), 14, 0, 6, 11),
                new DeveloperMetric(null, "Pedro",     LocalDate.of(2026, 5, 3), 11, 2, 5, 9),
                new DeveloperMetric(null, "Pedro",     LocalDate.of(2026, 5, 4), 19, 1, 7, 14)
            ));
        }
    }
}
