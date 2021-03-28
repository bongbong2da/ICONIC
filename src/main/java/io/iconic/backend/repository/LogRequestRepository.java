package io.iconic.backend.repository;

import io.iconic.backend.model.LogRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogRequestRepository extends JpaRepository<LogRequest, Long> {

}
