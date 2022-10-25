package com.opData.MSLogs.repository;

import com.opData.MSLogs.dto.Log;
import org.springframework.data.r2dbc.repository.R2dbcRepository;

public interface LogRepository extends R2dbcRepository<Log, Long> {

    // Implementar metodos propios si requerido


}
