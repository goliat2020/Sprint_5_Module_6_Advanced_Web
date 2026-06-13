package com.exampleback.demo.config;

import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import jakarta.servlet.Servlet;

@Configuration
public class H2ConsoleConfig implements WebMvcConfigurer {

    @Bean
    public ServletRegistrationBean<?> h2ConsoleServlet() {
        try {
            Class<?> servletClass = Class.forName("org.h2.server.web.JakartaWebServlet");
            Servlet servlet = (Servlet) servletClass.getDeclaredConstructor().newInstance();

            ServletRegistrationBean<Servlet> registration =
                    new ServletRegistrationBean<>(servlet, "/h2-console/*");
            registration.addInitParameter("webAllowOthers", "true");
            registration.addInitParameter("trace", "false");
            registration.setLoadOnStartup(1);
            return registration;
        } catch (ReflectiveOperationException e) {
            throw new IllegalStateException("Unable to initialize H2 console servlet", e);
        }
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addRedirectViewController("/h2-console", "/h2-console/");
    }
}
