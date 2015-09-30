#from sys import output.txt

def write(text):
    filename = "output.txt"
    
    #raw_input("?")
    
    print "Opening the file..."
    target = open(filename, 'w')
    
    target.truncate();
    
    line1 = "test1"
    line2 = "test1"
    line3 = "test1"
    
    print "I'm going to write these to the file."
    
    target.write(line1)
    target.write("\n")
    target.write(line2)
    target.write("\n")
    target.write(line3)
    target.write("\n")
    
    print "And finally, we close it."
    target.close()

write("")