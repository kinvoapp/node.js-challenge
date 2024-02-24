package com.rfdev.kinvo.dto;

import com.rfdev.kinvo.model.FinancialMovement;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
public class FinancialMovementResponseDTO extends FinancialMovementRequestDTO implements Serializable {

  private LocalDateTime createdAt;

  public FinancialMovementResponseDTO(FinancialMovement entity) {
    this.setFinancialMovementId(entity.getFinancialMovementId());
    this.setTypeOfMovement(entity.getTypeOfMovement());
    this.setTransactionValue(entity.getTransactionValue());
    this.setCreatedAt(LocalDateTime.now());
  }
}
