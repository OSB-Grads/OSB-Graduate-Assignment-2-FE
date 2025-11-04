const BASE_URL=import.meta.env.VITE_API_BASE_URL || process.env.VITE_API_BASE_URL

//Helper To Get users login Token From localStorage

function getToken(){
    return localStorage.getItem("access_token");
}

//Helper To Clear Token And Redirect To Login

function logoutAndRedirect(){
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    window.location.href="/login";   
}

//Main Api Fetch Function(Central function for all API calls)

export async function apiFetch<T>(
    path : string,
    options : RequestInit = {}
): Promise<T>{
    const token =getToken();
    const headers = new Headers(options.headers || {});
    headers.set("Accept","application/json");

    if(!headers.has("Content-Type") && options.body){         //headers are not set but body is there "POST/PUT/PATCH"
        headers.set("Content-Type", "application/json");
    }

    if(token){
        headers.set("Authorization",`Bearer ${token}`);
    }

    const response=await fetch(`${BASE_URL}${path}`,{
        ...options,
        headers,
    });

    if(response.status === 401){

        //unauthorized -- log out user and return to login

        logoutAndRedirect();
        throw new Error("Unauthorized-Redirecting to login");
    }

    if(!response.ok){
        throw new Error(`HTTP error : ${response.status}`);
    }
    return response.json() as Promise<T>;

}
    
