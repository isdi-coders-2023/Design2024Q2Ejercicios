Feature: Agregar elementos a la lista de tareas a través de la API

  Scenario: Usuario agrega un elemento a la lista de tareas mediante la API
    Given que el usuario tiene acceso a la API de gestión de tareas
    When el usuario envía una solicitud POST al endpoint "/tasks/add" con el siguiente JSON:
      """
      {
        "title":"Comprar leche"
      }
      """
    Then la solicitud debe ser exitosa con un código de respuesta 201
    And el elemento "Comprar leche" debe ser agregado a la lista de tareas