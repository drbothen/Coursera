## Put comments here that give an overall description of what your
## functions do

## Write a short comment describing this function

makeCacheMatrix <- function(x = matrix()) {
    # i will store the inverse
     cac <- NULL # initialize var
    
    # set - used to alter the matrix
    # it invalidates the cache
    set <- function(y) { # create a function called set used to perform alterations to a matrix
        x <<- y # stores Var in an alter environment
        cac <<- NULL # Nullify the cac var
    }
    
    # get - returns the raw matrix
    get <- function() { # function to return the raw matrix
        x
    }
    
    # setcac sets the cac variable
    # should be used only by cacheSolve
    setcac <- function(i) { # sets the cac varible
        cac <<- i
    }
    
    # getcac - reteives the cached inverse stored in cac
    getcac <- function() { # retieves the inverse stored in the cac varible
        cac
    }
    
    # return the special matrix
    list(set = set,
         get = get,
         setcac = setcac,
         getcac = getcac)  

}


## Write a short comment describing this function

cacheSolve <- function(x, ...) {
        ## Return a matrix that is the inverse of 'x'
    # get the cached inverse
    cac <- x$getcac() # setting cac var
    
    if(!is.null(cac)) { # if cac is NOT null
        # if the cacerse is cached, return it
        message("getting cached inverse") # Prints confirmation that the var inverse is cached
        return(cac) # return cached cac var
    }
    
    # otherwise, calc the inverse and cache it
    matr <- x$get() # retieve matrix
    cac <- solve(matr, ...) # solve the inverse
    x$setcac(cac) # Cache the inverse
    
    return(cac) # Return the inverse
}
