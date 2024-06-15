import { describe, it, expect } from '@jest/globals'
import Person from '../src/person.js'

describe('#Person Suite', () => {
  describe('#validate', () => {
    it('should throw if the name is not present', () => {
      // mock é a entrada necessaria para que o teste funcione
      const mockInvalidPerson = {
        name: '',
        cpf: '123.456.789-00'
      }
      
      expect(() => Person.validate(mockInvalidPerson))
        .toThrow(new Error('name is required'))
    })

    it('should throw if the cpf is not present', () => {
      // mock é a entrada necessaria para que o teste funcione
      const mockInvalidPerson = {
        name: 'John Doe',
        cpf: ''
      }
      
      expect(() => Person.validate(mockInvalidPerson))
        .toThrow(new Error('cpf is required'))
    })

    it('should not throw person is valid', () => {
      // mock é a entrada necessaria para que o teste funcione
      const mockInvalidPerson = {
        name: 'John Doe',
        cpf: '123.456.789-00'
      }
      
      expect(() => Person.validate(mockInvalidPerson))
        .not.toThrow()
    })
  })

  describe('#format', () => {
    // parte do principio que os dados ja foram validados!
    it('should format the person name and cpf', () => {
      // AAA

      // Arrange = Preparar, organizar
      const mockPerson = {
        name: 'John Doe',
        cpf: '123.456.789-00'
      }

      // Act = Agir, executar
      const formattedPerson = Person.format(mockPerson)

      // Assert = Validar, Afirmar, garantir
      const expectedPerson = {
        name: 'John',
        cpf: '12345678900',
        lastName: 'Doe'
      }

      expect(formattedPerson).toStrictEqual(expectedPerson)
    })
  })

  describe('#save', () => {
    // parte do principio que os dados ja foram validados!
    it('should fail to save to the database if you dont have the cpf', () => {
      // AAA

      // Arrange = Preparar, organizar
      const mockPerson = {
        name: 'John Doe',
        cpf: '',
        lastName: 'Doe'
      }

      // Act = Agir, executar
      const saveFn = () => Person.save(mockPerson)

      // Assert = Validar, Afirmar, garantir
      expect(saveFn).toThrow(new Error(`cannot save person without ${JSON.stringify(mockPerson)}`))
    })

    it('should fail to save to the database if you dont have the name', () => {
      // AAA

      // Arrange = Preparar, organizar
      const mockPerson = {
        name: '',
        cpf: '123.456.789-00',
        lastName: 'Doe'
      }

      // Act = Agir, executar
      const saveFn = () => Person.save(mockPerson)

      // Assert = Validar, Afirmar, garantir
      expect(saveFn).toThrow(new Error(`cannot save person without ${JSON.stringify(mockPerson)}`))
    })

    it('should fail to save to the database if you dont have the lastName', () => {
      // AAA

      // Arrange = Preparar, organizar
      const mockPerson = {
        name: 'John',
        cpf: '123.456.789-00',
        lastName: ''
      }

      // Act = Agir, executar
      const saveFn = () => Person.save(mockPerson)

      // Assert = Validar, Afirmar, garantir
      expect(saveFn).toThrow(new Error(`cannot save person without ${JSON.stringify(mockPerson)}`))
    })

    it('should save it in the database if you have the cpf, first and last name', () => {
      // AAA

      // Arrange = Preparar, organizar
      const mockPerson = {
        name: 'John',
        cpf: '123.456.789-00',
        lastName: 'Doe'
      }

      // Act = Agir, executar
      const saveFn = () => Person.save(mockPerson)

      // Assert = Validar, Afirmar, garantir
      expect(saveFn).not.toThrow()
    })
  })
})