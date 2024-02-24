package com.rfdev.kinvo.dto;

import com.rfdev.kinvo.model.Client;
import com.rfdev.kinvo.model.FinancialMovement;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClientResponseDTO extends ClientRequestDTO implements Serializable {
  private BigDecimal balance;

  public ClientResponseDTO(Client client) {
    this.setClientId(client.getClientId());
    this.setName(client.getName());
    this.setBalance(client.getBalance());
  }

  public ClientResponseDTO(Client entity, Set<FinancialMovement> financialMovements) {
    this(entity);
    financialMovements.forEach(
      movements -> this.financialMovementResponseDTOS.add(new FinancialMovementResponseDTO(movements)));
  }
}
