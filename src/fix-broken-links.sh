#Home page link
sed -i 's,http://vlabs.ac.in/index.html,http://vlab.co.in,g' **/*.html
#Labs page link
sed -i 's,http://vlabs.ac.in/labs.html,http://vlab.co.in/participating-institute-iiit-hyderabad,g' **/*.html
#Partners page link
sed -i 's,http://vlabs.ac.in/index.html#partner,http://vlab.co.in/participating-institutes,g' **/*.html
sed -i 's,http://vlab.co.in#partner,http://vlab.co.in/participating-institutes,g' **/*.html
sed -i 's,http://vlab.co.in/#partner,http://vlab.co.in/participating-institutes,g' **/*.html
#Contact page Link
sed -i 's,http://vlabs.ac.in/index.html#contact,http://vlab.co.in/contact-us,g' **/*.html
sed -i 's,http://vlab.co.in#contact,http://vlab.co.in/contact-us,g' **/*.html
sed -i 's,http://vlab.co.in/#contact,http://vlab.co.in/contact-us,g' **/*.html
#Domain page link
sed -i 's,http://vlabs.ac.in/computer-science-and-engineering-labs.html,http://vlab.co.in/broad-area-computer-science-and-engineering,g' **/*.html

