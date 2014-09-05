corr <- function(directory, threshold = 0) {
    ## 'directory' is a character vector of length 1 indicating
    ## the location of the CSV files
    
    ## 'threshold' is a numeric vector of length 1 indicating the
    ## number of completely observed observations (on all
    ## variables) required to compute the correlation between
    ## nitrate and sulfate; the default is 0
    
    ## Return a numeric vector of correlations
    
    ob <- complete(directory) # builds ob numbers to compare threshold against. assigns to ob
    sid <- ob[ob[,2]>threshold,1] # looks for ID's with given threshold and assign to sid
    ret <- numeric() # intialize ret var
    if (length(sid) > 0){ # as long as sid is greater then zero do the following
        ids <- sprintf("%03d.csv", sid) # create file names based on ID provided and assign to sid (Selected ID)
        xfiles <- file.path(directory, ids) # Build a completed file location for each ID and assign to xfiles
        for (xfile in xfiles) { # for file name (xfile) in the list of files (xfiles) do the following
            xtemp <- na.omit(read.csv(xfile)) # read  after omiting all NA's in csv to temp holding var (xtemp)
            nit <- xtemp[,3]
            sul <- xtemp[,2]
            ret <- rbind(ret, cor(sul,nit)) # Combine by row, temp (xtemp) holding to main var (xdata)
            rm(xtemp) # Remove xtemp, possibly save memory?
            rm(nit) # Remove  nit, possibly save memory?
            rm(sul) # Remove sul, possibly save memory?
        }
    }
    return(as.vector(ret))# return the cor as a vector in var ret
}
