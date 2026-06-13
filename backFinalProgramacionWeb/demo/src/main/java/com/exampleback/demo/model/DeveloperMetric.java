package com.exampleback.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "developer_metrics")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeveloperMetric {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "developer_name", nullable = false)
    private String developerName;

    @Column(name = "metric_date", nullable = false)
    private LocalDate metricDate;

    @Column(nullable = false)
    private Integer commits;

    @Column(name = "bugs_fixed", nullable = false)
    private Integer bugsFixed;

    @Column(name = "tasks_completed", nullable = false)
    private Integer tasksCompleted;

    @Column(name = "story_points", nullable = false)
    private Integer storyPoints;

    public DeveloperMetric() {
    }

    public DeveloperMetric(Long id, String developerName, LocalDate metricDate, Integer commits, Integer bugsFixed, Integer tasksCompleted, Integer storyPoints) {
        this.id = id;
        this.developerName = developerName;
        this.metricDate = metricDate;
        this.commits = commits;
        this.bugsFixed = bugsFixed;
        this.tasksCompleted = tasksCompleted;
        this.storyPoints = storyPoints;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDeveloperName() {
        return developerName;
    }

    public void setDeveloperName(String developerName) {
        this.developerName = developerName;
    }

    public LocalDate getMetricDate() {
        return metricDate;
    }

    public void setMetricDate(LocalDate metricDate) {
        this.metricDate = metricDate;
    }

    public Integer getCommits() {
        return commits;
    }

    public void setCommits(Integer commits) {
        this.commits = commits;
    }

    public Integer getBugsFixed() {
        return bugsFixed;
    }

    public void setBugsFixed(Integer bugsFixed) {
        this.bugsFixed = bugsFixed;
    }

    public Integer getTasksCompleted() {
        return tasksCompleted;
    }

    public void setTasksCompleted(Integer tasksCompleted) {
        this.tasksCompleted = tasksCompleted;
    }

    public Integer getStoryPoints() {
        return storyPoints;
    }

    public void setStoryPoints(Integer storyPoints) {
        this.storyPoints = storyPoints;
    }
}