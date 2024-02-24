package com.rfdev.kinvo.service;

import com.rfdev.kinvo.dto.ClientRequestDTO;
import com.rfdev.kinvo.dto.ClientResponseDTO;
import com.rfdev.kinvo.dto.FinancialMovementResponseDTO;
import com.rfdev.kinvo.model.Client;
import com.rfdev.kinvo.model.FinancialMovement;
import com.rfdev.kinvo.repository.ClientRepository;
import com.rfdev.kinvo.repository.FinancialMovementRepository;
import com.rfdev.kinvo.service.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class ClientService {

  @Autowired
  ClientRepository clientRepository;

  @Autowired
  private FinancialMovementRepository financialMovementRepository;

  @Transactional(readOnly = true)
  public Page<ClientResponseDTO> findAllPaged(Pageable pageable) {
    Page<Client> list = clientRepository.findAll(pageable);
    return list.map(ClientResponseDTO::new);
  }

  @Transactional(readOnly = true)
  public ClientResponseDTO findById(Long clientId) {
    Optional<Client> obj = clientRepository.findById(clientId);
    Client entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not Found"));
    return new ClientResponseDTO(entity, entity.getFinancialMovements());
  }

  @Transactional
  public ClientResponseDTO insert(ClientRequestDTO dto) {
    Client entity = new Client();
    copyDtoToEntity(dto, entity);
    entity.setBalance(BigDecimal.ZERO);
    entity = clientRepository.save(entity);
    return new ClientResponseDTO(entity);
  }

  @Transactional
  public ClientResponseDTO update(Long clientId, ClientRequestDTO dto) {
    try {
      Client entity = clientRepository.getReferenceById(clientId);
      copyDtoToEntity(dto, entity);
      entity = clientRepository.save(entity);
      return new ClientResponseDTO(entity);
    } catch (EntityNotFoundException e) {
      throw new ResourceNotFoundException("Id not found " + clientId);
    }
  }

  public void delete(Long clientId) {
    try {
      clientRepository.deleteById(clientId);
    } catch (EmptyResultDataAccessException e) {
      throw new ResourceNotFoundException("Id not found " + clientId);
    }
  }

  private void copyDtoToEntity(ClientRequestDTO dto, Client entity) {
    entity.setName(dto.getName());
    entity.getFinancialMovements().clear();
    for (FinancialMovementResponseDTO financialMovementResponseDTO : dto.getFinancialMovementResponseDTOS()) {
      FinancialMovement movement = financialMovementRepository.getReferenceById(financialMovementResponseDTO.getFinancialMovementId());
      entity.getFinancialMovements().add(movement);
    }
  }
}
