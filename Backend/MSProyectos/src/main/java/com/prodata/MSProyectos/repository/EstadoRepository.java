package com.prodata.MSProyectos.repository;


import com.prodata.MSProyectos.dto.Estado;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstadoRepository extends ReactiveCrudRepository<Estado, Long> {


}
