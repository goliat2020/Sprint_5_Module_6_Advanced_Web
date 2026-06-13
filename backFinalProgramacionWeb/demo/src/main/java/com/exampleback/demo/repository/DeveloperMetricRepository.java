package com.exampleback.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.exampleback.demo.model.DeveloperMetric;

@Repository
public interface DeveloperMetricRepository extends JpaRepository<DeveloperMetric, Long> {
        List<DeveloperMetric> findByDeveloperName(String developerName);
}