package com.exampleback.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.exampleback.demo.dto.MetricResponseDTO;
import com.exampleback.demo.model.DeveloperMetric;
import com.exampleback.demo.repository.DeveloperMetricRepository;

@Service
public class MetricsService {

    private final DeveloperMetricRepository repository;

    public MetricsService(DeveloperMetricRepository repository) {
        this.repository = repository;
    }

    private static final List<String> VALID_METRICS =
            List.of("commits", "bugs", "tasks", "storyPoints");

    public List<MetricResponseDTO> getMetricData(String metric) {
        if (!VALID_METRICS.contains(metric)) {
            throw new IllegalArgumentException("Métrica no válida: " + metric +
                    ". Valores permitidos: " + VALID_METRICS);
        }
        return repository.findAll().stream()
                .map(m -> mapToDTO(m, metric))
                .toList();
    }

    private MetricResponseDTO mapToDTO(DeveloperMetric m, String metric) {
        MetricResponseDTO dto = new MetricResponseDTO();
        dto.setLabel(m.getMetricDate().toString());
        dto.setValue(switch (metric) {
            case "commits"     -> m.getCommits();
            case "bugs"        -> m.getBugsFixed();
            case "tasks"       -> m.getTasksCompleted();
            case "storyPoints" -> m.getStoryPoints();
            default            -> 0;
        });
        return dto;
    }
}