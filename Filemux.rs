use std::fs;
use std::io;
use std::path::Path;
use walkdir::WalkDir;

fn clean_directory(directory: &str, extension: &str) -> io::Result<()> {
    // Iterate over the directory and its subdirectories
    for entry in WalkDir::new(directory) {
        let entry = entry?;
        let path = entry.path();
        
        // Check if the entry is a file and if it has the specified extension
        if path.is_file() {
            if let Some(ext) = path.extension() {
                if ext == extension {
                    // Print the file being deleted
                    println!("Deleting file: {:?}", path);
                    
                    // Delete the file
                    fs::remove_file(path)?;
                }
            }
        }
    }
    Ok(())
}

fn main() {
    let directory = "./path/to/your/directory"; // Change to your directory
    let extension = "txt"; // Change to the file extension you want to delete

    match clean_directory(directory, extension) {
        Ok(_) => println!("File cleaning completed!"),
        Err(e) => eprintln!("Error: {}", e),
    }
}
