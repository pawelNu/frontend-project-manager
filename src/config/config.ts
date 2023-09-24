const environmentUrls = new Map()

environmentUrls.set('localhost', 'http://localhost:8080')
// environmentUrls.set('frontend-react-book-store.onrender.com', 'https://backend-spring-boot-bookstore.onrender.com')

export default environmentUrls.get(window.location.hostname)
