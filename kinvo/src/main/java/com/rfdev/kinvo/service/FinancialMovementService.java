package com.rfdev.kinvo.service;

import com.rfdev.kinvo.dto.FinancialMovementRequestDTO;
import com.rfdev.kinvo.dto.FinancialMovementResponseDTO;
import com.rfdev.kinvo.model.Client;
import com.rfdev.kinvo.model.FinancialMovement;
import com.rfdev.kinvo.repository.ClientRepository;
import com.rfdev.kinvo.repository.FinancialMovementRepository;
import com.rfdev.kinvo.service.exceptions.ResourceNotFoundException;
import com.rfdev.kinvo.service.exceptions.TypeOfMovementNotExist;
import com.rfdev.kinvo.service.strayegy.ExpenseTransaction;
import com.rfdev.kinvo.service.strayegy.IncomeTransaction;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class FinancialMovementService {

  private final Map<String, FinancialTransaction> strategy = Map.of(
    "income", new IncomeTransaction(),
    "expense", new ExpenseTransaction()
  );

  @Autowired
  private ClientRepository clientRepository;

  @Autowired
  private FinancialMovementRepository financialMovementRepository;

  @Transactional
  public FinancialMovementResponseDTO transaction(Long clientId, FinancialMovementRequestDTO dto) {
    try {
      Client client = clientRepository.getReferenceById(clientId);
      makeTransaction(dto, client);
      FinancialMovement financialMovement = createFinancialMovement(dto, client, dto.getTypeOfMovement());
      client.addFinancialMovement(financialMovement);
      clientRepository.save(client);
      return new FinancialMovementResponseDTO(financialMovement);
    } catch (EntityNotFoundException e) {
      throw new ResourceNotFoundException("Id not found " + clientId);
    } catch (NullPointerException e) {
      throw new TypeOfMovementNotExist("Type of Movement " + dto.getTypeOfMovement() + " not exist");
    }
  }

  private void makeTransaction(FinancialMovementRequestDTO dto, Client client) {
    String typeOfMovement = dto.getTypeOfMovement();
    strategy.get(typeOfMovement).makeTransaction(dto.getTransactionValue(), client);
  }

  private FinancialMovement createFinancialMovement(FinancialMovementRequestDTO request, Client client, String typeOfMovement) {
    FinancialMovement entity = new FinancialMovement();
    entity.setClient(client);
    entity.setTypeOfMovement(typeOfMovement);
    entity.setTransactionValue(request.getTransactionValue());
    entity.setCreatedAt(LocalDateTime.now());
    return entity;
  }

  public List<FinancialMovementResponseDTO> findByClientId(Long clientId) {
    List<FinancialMovement> financialMovements = financialMovementRepository.findByClientClientId(clientId);
    if (financialMovements.isEmpty()) throw new ResourceNotFoundException("Client not Found");
    return financialMovements.stream()
      .map(FinancialMovementResponseDTO::new)
      .collect(Collectors.toList());
  }
}
