add2 <- function(x, y){
    x + y
}

above10 <- function(x){
    use <- x > 10
    x[use]
}

above <- function(x, n = 10){
    use <- x > n
    x[use]
}


columnmean <- function(y, removeNA = TRUE){
    nc <- ncol(y)
    #print(nc)
    means <- numeric(nc)
    #print(means)
    for(i in 1:nc){
        means[i] <- mean(y[,i], na.rm = removeNA)
        #print(means[i])
    }
    means
}