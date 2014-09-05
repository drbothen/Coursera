complete <- function(directory, id = 1:332) {
    ## 'directory' is a character vector of length 1 indicating
    ## the location of the CSV files
    
    ## 'id' is an integer vector indicating the monitor ID numbers
    ## to be used
    
    ## Return a data frame of the form:
    ## id nobs
    ## 1  117
    ## 2  1041
    ## ...
    ## where 'id' is the monitor ID number and 'nobs' is the
    ## number of complete cases
    sid <- sprintf("%03d.csv", id) # create file names based on ID provided and assign to sid (Selected ID)
    xfiles <- file.path(directory, sid) # Build a completed file location for each ID and assign to xfiles
    
    xdata <- NULL # intialize xdata
    for (xfile in xfiles) { # for file name (xfile) in the list of files (xfiles) do the following
        xtemp <- nrow(na.omit(read.csv(xfile))) # read number of row remaining after omiting all NA's in csv to temp holding var (xtemp)
        xdata <- rbind(xdata, xtemp) # Combine by row, temp (xtemp) holding to main var (xdata)
        rm(xtemp) # Remove xtemp, possibly save memory?
    }
    xdata <- cbind(c(id), xdata) # add id column and iterate it down based on the value of id
    colnames(xdata) <- c("id", "nobs") # add column names id and nobs
    rownames(xdata) <- NULL # remove xtemp from the rowname
    return(data.frame(xdata)) # return xdata as a dataframe
}

