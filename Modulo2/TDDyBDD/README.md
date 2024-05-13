# Gestor de tareas:

## User story 1

```
COMO usuario, QUIERO poder agregar elementos a una lista de tareas, PARA poder mantener un registro de mis tareas pendientes.
```

### Tareas

1. **Crear endpoint de la API para agregar elementos a la lista de tareas:**
   - Desarrollar un endpoint POST en la API con la ruta /tasks/add que acepte solicitudes JSON.
   - La API debe recibir los textos de las tarea como parte del cuerpo de la solicitud.
   - La API debe estar correctamente configurada y ser accesible desde cualquier cliente que envíe solicitudes HTTP.
   - La API debe devolver la respuesta creada con el Id de base de datos asignado
2. **Implementar la lógica para agregar elementos a la lista de tareas:**
   - Escribir la lógica necesaria en el backend para procesar las solicitudes POST recibidas en el endpoint /tasks/add.
   - La lógica debe ser capaz de agregar el elemento recibido a la lista de tareas almacenada en la base de datos.

### Criterios de Aceptación

- El endpoint /tasks/add debe estar disponible y responder correctamente a las solicitudes POST.
- Al enviar una solicitud POST al endpoint /tasks/add con el cuerpo de la solicitud que contiene el texto de la tarea, la tarea debe ser agregada correctamente a la lista de tareas.

```gherkin

Feature: Agregar elementos a la lista de tareas a través de la API

  Scenario: Usuario agrega un elemento a la lista de tareas mediante la API
    Given que el usuario tiene acceso a la API de gestión de tareas
    When el usuario envía una solicitud POST al endpoint "/tasks/add" con el siguiente JSON:
      """
      {
        "title":"Comprar leche"
      }
      """
    Then la solicitud debe ser exitosa con un código de respuesta 200
    And el contenido de la respuesta debe ser
    """
      {
         id: 1,
         title:"Comprar leche"
      }
    """
    And el elemento "Comprar leche" debe ser agregado a la lista de tareas

```

## User story 2

```
COMO usuario, QUIERO poder marcar una tarea como completada en mi lista de tareas, PARA poder realizar un seguimiento del progreso de mis actividades.
```

### Tareas

1. **Modificar el modelo de datos para almacenar el estado de la tarea (completada o no):**

   - Actualizar el modelo de datos en la base de datos para incluir un nuevo campo que represente el estado de la tarea (por ejemplo, un campo booleano llamado completed).
   - Todas las nuevas tareas agregadas a la lista de tareas a través de la API se marcarán automáticamente como no completadas.
   - Se debe proporcionar una migración de base de datos para aplicar los cambios en el esquema existente.

2. **Crear endpoint de la API para marcar una tarea como completada:**

   - Desarrollar un endpoint PATCH en la API con la ruta `/tasks/complete` que acepte solicitudes JSON.
   - La API debe recibir el ID de la tarea a completar como parte del cuerpo de la solicitud.

3. **Implementar la lógica para marcar una tarea como completada:**
   - Escribir la lógica necesaria en el backend para procesar las solicitudes POST recibidas en el endpoint `/tasks/complete`.
   - La lógica debe marcar la tarea correspondiente como completada en la lista de tareas almacenada en la base de datos.
   - Se debe manejar adecuadamente el caso en el que la tarea no exista o ya esté marcada como completada.

**Criterios de Aceptación:**

1. El endpoint `/tasks/complete` debe estar disponible y responder correctamente a las solicitudes POST.
2. Al enviar una solicitud POST al endpoint `/tasks/complete` con el ID de la tarea a completar, la tarea correspondiente debe ser marcada como completada en la lista de tareas.
3. La API debe ser capaz de manejar el caso en el que la tarea no exista o ya esté marcada como completada, y devolver un código de error adecuado.
