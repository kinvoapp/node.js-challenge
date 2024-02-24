package com.rfdev.kinvo.repository;

import com.rfdev.kinvo.model.FinancialMovement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinancialMovementRepository extends JpaRepository<FinancialMovement, Long> {
}
