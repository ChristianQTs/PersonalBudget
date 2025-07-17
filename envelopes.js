// JavaScript source code
exports.envelopes = [
    {
        name: 'groceries',
        budget: 300,
        spent: 0,
        get balance() {
            return this.budget - this.spent
        }

    },
    {
        name: 'rent',
        budget: 1000,
        spent: 0,
        get balance() {
            return this.budget - this.spent
        }
    },
    {
        name: 'investments',
        budget: 500,
        spent: 0,
        get balance() {
            return this.budget - this.spent
        }
    },
    {
        name: 'entertainment',
        budget: 100,
        spent: 0,
        get balance() {
            return this.budget - this.spent
        }
    },
    {
        name: 'emergencies',
        budget: 100,
        spent: 0,
        get balance() {
            return this.budget - this.spent
        }
    }
]

exports.calculateTotalPlannedBudget = () => {
    return this.envelopes.reduce((sum, env) => sum + env.budget, 0)
}
