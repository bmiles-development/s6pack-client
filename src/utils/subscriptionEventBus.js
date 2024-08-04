class _SubscriptionEventBus {
    constructor() {
        this.bus = {};
        this.currentSubscriptions = {};
    }

    async prepare(id, callback) {
        this.bus[id] = callback;
    }

    async subscribe(id, ...params) {
        if (!this.currentSubscriptions[id]) {
            //console.log('subscribing now: ' + id);
            try {
                if (this.bus[id]) {
                    this.currentSubscriptions[id] = await this.bus[id](...params);
                } else {
                    console.log('no bus id found for ' + id);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    async unsubscribe(id) {
        await this.currentSubscriptions[id].unsubscribe();
        delete this.currentSubscriptions[id];
    }

    async unsubscribeAll() {
        for (const [key] of Object.entries(this.currentSubscriptions)) {
            await this.currentSubscriptions[key].unsubscribe();
            delete this.currentSubscriptions[key];
        }
    }
}

export const SubscriptionEventBus = new _SubscriptionEventBus();
