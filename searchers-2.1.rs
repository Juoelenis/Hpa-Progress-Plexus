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

// Local search function: searches for files containing the query in their name (recursive, only .html files)
async fn local_search(query: web::Query<Query>) -> impl Responder {
    let search_dir = "./"; // Change this to your desired directory
    let mut results = Vec::new();
    fn visit_dirs(dir: &str, query: &str, results: &mut Vec<String>) {
        if let Ok(entries) = fs::read_dir(dir) {
            for entry in entries.flatten() {
                let path = entry.path();
                if path.is_dir() {
                    if let Some(p) = path.to_str() {
                        visit_dirs(p, query, results);
                    }
                } else if let Some(name) = path.file_name().and_then(|n| n.to_str()) {
                    if name.to_lowercase().contains(&query.to_lowercase()) && name.ends_with(".html") {
                        if let Some(p) = path.to_str() {
                            results.push(p.replace(".\\", "").replace("./", ""));
                        }
                    }
                }
            }
        }
    }
    visit_dirs(search_dir, &query.q, &mut results);
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