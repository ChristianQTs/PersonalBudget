

\# Personal Budget API



This API aims to create a Personal Budget app using envelopes to store different categories of expenses and their relative budgets and balances.



This API takes \*\*HTTP Requst\*\* from the URL and sends responses in JSON format.



> GET methods for all envelopes and specific envelopes, name of the envelope to be specified in the url as a parameter

> PUT method to withdraw from one envelope, using the envelope name and amount as URL parameters.

> POST method to transfer budget from one envelope to another. First parameter specifies which envelope to subtract the budget from, second parameter which envelope to add it to.

> DELETE method to delete a specific envelope.



The base URL using localhost is as follows: \*\*http://localhost:3000/personalBudget/\*\*

