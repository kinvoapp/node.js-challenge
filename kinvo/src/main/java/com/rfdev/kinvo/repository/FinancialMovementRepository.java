package com.rfdev.kinvo.repository;

import com.rfdev.kinvo.model.FinancialMovement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FinancialMovementRepository extends JpaRepository<FinancialMovement, Long> {

  List<FinancialMovement> findByClientClientId(Long clientId);
}
