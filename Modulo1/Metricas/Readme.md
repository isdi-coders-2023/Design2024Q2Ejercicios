# Ejercicios de Métricas

## Introducción

El objetivo de este repositorio es proporcionar una serie de ejericios para practicar el análisis de problemas de eficiencia en aplicaciones Javascript.

## Setup

Todo el proyecto requiere:

- Node v18.18+
- Yarn 1.22.19+

Para comenzar con el ejercicio se deben instalar las dependencias y levantar el backend y el frontend.
Para ello, seguir los siguientes pasos:

### Backend

Desde la raíz del proyecto, ejecutar en una consola los siguientes comandos:

```
cd backend
yarn install
yarn start:dev
```

### Frontend

Desde la raíz del proyecto, ejecutar en otra consola los siguientes comandos:

```
cd frontend
yarn install
yarn dev
```

## Ejercicio

El ejercicio está compuesto por una página con tres elementos, representados por fotos de animales: un perezoso, una babosa y una tortuga. Al pulsar sobre cada uno de ellos se realiza una llamada al backend, que luego es procesada en el frontend para mostrar una visualización de los datos recibidos. En todos los casos la llamada al backend devolverá una cantidad considerable de datos, y en todos ellos el tiempo de espera hasta la tabla es del orden de segundos. El ejercicio consiste en, para cada problema:

- averiguar dónde se encuentran las limitaciones de rendimiento
- dar al menos una idea de cómo solucionarlas
- y determinar qué limites tiene la optimización en sí (i.e.: qué partes no pueden ser mejoradas de ninguna manera)

Para facilitar el análisis del código, el ejercicio tiene un botón en la parte superior izquierda que permite añadir el flag `debug` a todas las llamadas al backend. Este flag fuerza al backend a reducir el tamaño de todas las peticiones, paliando todos los problemas de rendimiento (y facilitando la depuración del código con fines de análisis).

## Código instrumentado

En el respositorio existe una rama `instrumented` que contiene el mismo código de master, pero instrumentado con llamadas a la Performance API para analizar el comportamiento de backend y frontend.

Es importante tener en cuenta que, como en otras partes del proyecto, las soluciones no pretenden ser un ejemplo a seguir en materia de buenas prácticas, sino únicamente mostrar ejemplos de qué métricas pueden ser relevantes y de cómo conseguirlas.

## Soluciones a los problemas

En el repositorio existe una rama `solved` que contiene una versión del código con los cambios necesarios para eliminar los problemas de rendimiento.

Es importante tener en cuenta que, como en otras partes del proyecto, las soluciones no pretenden ser un ejemplo a seguir en materia de buenas prácticas, sino únicamente señalar en qué puntos del código se encontraban los problemas, y dar ideas para solucionarlos.
