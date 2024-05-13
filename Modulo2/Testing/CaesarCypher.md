## Cifrado César

El cifrado César consiste en reemplazar cada letra del texto plano por otra letra que se encuentre un número fijo de lugares más arriba o más abajo en el alfabeto.

### Descripción

Este programa realiza una variación del desplazamiento César. El desplazamiento aumenta en 1 para cada carácter (en cada iteración).

Si el desplazamiento es inicialmente 1, el primer carácter del mensaje a codificar será desplazado 1 posición, el segundo carácter será desplazado 2 posiciones, y así sucesivamente...

Por ejemplo, dado el mensaje:

```typescript
u = "I should have known that you would have a perfect answer for me!!!";
```

`caesarChyper(u, 1)` devuelve:

```typescript
v = "J ukszrk pjfp wacld kztn tkr unumf keak h xnbqqph pdjoxl ako kd!!!";
```

### Requerimientos

- Implementar una función en TypeScript que cifre un mensaje utilizando el cifrado César.
- La función debe aceptar el mensaje y un valor de desplazamiento como entrada y devolver el mensaje cifrado.
- El desplazamiento debe aumentar en 1 para cada carácter del mensaje.
- Manejar los casos especiales como caracteres no alfabéticos.
- Escribir pruebas unitarias utilizando un marco de pruebas Jest para asegurar la corrección del cifrado en diferentes casos de entrada, incluyendo casos límite y casos de error.
