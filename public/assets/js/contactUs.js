let strContact = `
 <div class="container d-flex justify-content-between align-items-start flex-wrap">
            <div class="footer-part1">
                <h3>Pages</h3>
                <div class="d-flex justify-content-start align-items-start flex-wrap gap-3 gap-sm-5 pt-5">
                    <ul>
                        <li><a href="/ourUNI">Home</a></li>
                        <li><a href="/ourUNI/public/html/pages/aboutUs.html">About Us</a></li>
                        <li><a href="/ourUNI/public/html/pages/faculties.html">Facluties</a></li>
                        <li><a href="#contactUs">Contact Us</a></li>

                    </ul>
                    <ul>
                        <li><a href="/ourUNI/public/html/pages/blog.html">Blog</a></li>
                        <li><a href="/ourUNI/public/html/pages/gallery.html">Gallery</a></li>
                        <li><a href="/ourUNI/public/html/pages/professors.html">Our Professors</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-part2 pt-4 pt-sm-0">
                <h3>Contact Us</h3>
                <form class="d-flex justify-content-start align-items-start flex-wrap pt-5 gap-4">
                    <input type="text" placeholder="Your Email">
                    <textarea name="" id="" placeholder="Message"></textarea>
                    <button class="pink-btn">Send</button>
                </form>
            </div>
        </div>
`


document.getElementById('contactUs').innerHTML =strContact