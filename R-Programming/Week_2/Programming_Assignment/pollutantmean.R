pollutantmean <- function(directory, pollutant, id = 1:332) {
    ## 'directory' is a character vector of length 1 indicating
    ## the location of the CSV files
    
    ## 'pollutant' is a character vector of length 1 indicating
    ## the name of the pollutant for which we will calculate the
    ## mean; either "sulfate" or "nitrate".
    
    ## 'id' is an integer vector indicating the monitor ID numbers
    ## to be used
    
    ## Return the mean of the pollutant across all monitors list
    ## in the 'id' vector (ignoring NA values)

    sid <- sprintf("%03d.csv", id) # create file names based on ID provided and assign to sid (Selected ID)
    
    xfiles <- file.path(directory, sid) # Build a completed file location for each ID and assign to xfiles
    
    xdata <- NULL # intialize xdata
    
    for (xfile in xfiles) { # for file name (xfile) in the list of files (xfiles) do the following
        xtemp <- read.csv(xfile) # read csv to temp holding var (xtemp)
        xdata <- rbind(xdata, xtemp) # Combine by row, temp (xtemp) holding to main var (xdata)
        rm(xtemp) # Remove xtemp, possibly save memory?
    }
    nafilter <- xdata[complete.cases(xdata[pollutant]),] # complete.cases function removes all NA. In this case we are doing it by varible in csv "pollutant"
    final.d <- mean(nafilter[,pollutant]) # Compute mean of selected pollutant 
    rm(nafilter) # remove temp var (nafilter) possibly saves memory?
    return(final.d) # return final data (final.d)
}