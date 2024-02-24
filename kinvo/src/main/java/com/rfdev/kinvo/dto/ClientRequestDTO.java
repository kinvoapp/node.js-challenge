package com.rfdev.kinvo.dto;

import com.rfdev.kinvo.model.Client;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ClientRequestDTO implements Serializable {

  private Long clientId;

  @NotBlank(message = "Name is Mandatory")
  private String name;

  protected Set<FinancialMovementResponseDTO> financialMovementResponseDTOS = new HashSet<>();

  public ClientRequestDTO(Client entity) {
    this.clientId = entity.getClientId();
    this.name = entity.getName();
    entity.getFinancialMovements().forEach(
      financialMovement ->
        this.financialMovementResponseDTOS.
          add(new FinancialMovementResponseDTO(financialMovement)));
  }
}
