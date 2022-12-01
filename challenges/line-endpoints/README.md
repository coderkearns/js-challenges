# Line Endpoints

Write a function that, given a 2d grid representing an image, returns the endpoints of a black line in the given image.

Consider (0, 0) to be the top-left spot, with the x growing to the right and the y growing to the bottom.

## Examples (`-`=white, `0`=black):

```
GRID:
---0-
---0-
---0-
---0-
-----

ENDPOINTS:
(3, 0) and (3, 3)
```

```
GRID:
-----
-000-
-----
-----
-----

ENDPOINTS:
(1, 1) and (3, 1)
```

```
GRID:
-----
-0---
--0--
---0-
-----

ENDPOINTS:
(1, 1) and (3, 3)
```
