use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use serde::Deserialize;
use std::fs;
use std::path::PathBuf;

#[derive(Deserialize)]
struct Query {
    q: String,
}

async fn redirect(query: web::Query<Query>) -> impl Responder {
    let search_url = format!(
        "https://duckduckgo.com/?q={}",
        urlencoding::encode(&query.q)
    );
    HttpResponse::Found()
        .append_header(("Location", search_url))
        .finish()
}

// Local search function: searches for files containing the query in their name
async fn local_search(query: web::Query<Query>) -> impl Responder {
    let search_dir = "./"; // Change this to your desired directory
    let mut results = Vec::new();

    if let Ok(entries) = fs::read_dir(search_dir) {
        for entry in entries.flatten() {
            let path: PathBuf = entry.path();
            if let Some(name) = path.file_name().and_then(|n| n.to_str()) {
                if name.to_lowercase().contains(&query.q.to_lowercase()) {
                    results.push(name.to_string());
                }
            }
        }
    }

    HttpResponse::Ok().json(results)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/search", web::get().to(redirect))
            .route("/local_search", web::get().to(local_search))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}