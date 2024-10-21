
![itch banner-3](https://github.com/user-attachments/assets/631ce7bc-51cd-4dcb-a270-6b5b1e20fa96)


# Loop - Onchain RLHF Platform
Built during EthSF 2024
🏆 $1,500 Hedera Prize + 🏆 $1,500 AirDAO AI prize, 


Loop brings Reinforcement Learning with Human Feedback (RLHF) into the blockchain space and makes the human feedback crowdsourced. This platform integrates on-chain reward systems, empowering users to train AI models and earn rewards for quality feedback.



https://github.com/user-attachments/assets/ac48148e-d346-4aa2-bf6a-b35fd364c22f




### What is Reinforcement Learning with Human Feedback (RLHF)

RLHF is a machine learning approach that uses human feedback to 'guide' the learning of AI models. Whenever ChatGPT asks you to pick between 2 split-screen answer options, that is an example of RLHF. It is injecting your human feedback to improve the model weights and thus fine tune the model.



Inherently, RLHF REQUIRES humans. This is because the feedback needs to be not objective. For example, if we were making a FunnyGPT, we could use RLHF to score the 'funniness' of llm outputs.


So, RLHF requires human feedback and judgment to steer AI learning by rewarding good outputs and penalizing bad outputs.

### Why is blockchain key for RLHF?
1. Crypto Incentives: With blockchain, we can easily mobilize a large crowd of people with token incentives. Also, this brings more diversity in the perspectives because anyone (decentralized) can access, give feedback, and earn tokens. This is opposite to a company's current approach of doing RLHF on their own model.


2. Privacy + Security: Blockchain makes it possible to compute on encrypted data using advanced techniques like homomorphic encryption or zero-knowledge proofs, allowing AI models to be trained without exposing sensitive user data. In future developments, we hope to integrate privacy-preserving blockchains that will allow RLHF systems to keep data confidential while still benefiting from human feedback. This will allow us to use RLHF with privacy compliance in various industries like healthcare or finance. (Future works)


### How does it work?

![L p](https://github.com/user-attachments/assets/1dd32173-55c5-446d-ad62-b49930ca532a)

1. UserA can upload any opensource model from huggingface. They pay chain-native tokens and set a bounty reward amount.
2. UserB can access LLMs uploaded by other users (like user A) and use them for free. After each LLM output, UserB is prompted to give feedback (too short, too long, was responsive, bad output..). For helping give feedback, users earn crypto tokens deposited to account.
3. UserA can access the admin dashboard and then see all of the data coming from the crowdsourced RLHF. This data can be used to retrain the model and update the weights.


## Installation


**React Web App**
```
cd frontend
cd react-web-App
npm install --legacy-peer-deps
npm run start
```

**Smart Contracts**
To deploy on thirdweb:
```
cd crypto
cd thirdweb-deployment
npx thirdweb@latest deploy
```
**To see contract:**
```
cd crypto
cd Contracts
```

**Flask Backend**
```
cd backend
py flask_server.py
```


# Smart Contract Deployments
### Zircuit Testnet:

Address: [0x8843c35e6E366f3DBBB31ad111E640D4AdEc08F5](https://)
Branch: /zircuit

### Polygon Amoy:

Address: [0x56B6893A61F9D3988B176f36f2C33bc910513495](https://)
Branch: /polygon

### Neon EVM Devnet:

Address: [0x7770cA45bd79a5e57dC0bd83b8c52D6E7e33B50c](https://)
Branch: /neon

### Morph:

Address: [0xE8046f922F3Ad4bd633447014DDf89d57070ED87](https://)
Branch: /morph

### Unichain:

Address: [0x7a722C4C585F17B237DD2C57dD46677c7D348420](https://)
Branch: /unichain

### Story:

Address: [0xba30D3b9F488554696814F19C5Be18e7668E67e3](https://)
Branch: /story

### AirDAO
Address: [0xe9113ab129cE12cF7cc50A5D65cfA34FEC4746ed]()
Branch: /airdao

### Hedera
Address: [0x813722E1244b608a8d60fD5090C68bF6Ac12b602]()
Branch: /hedera

### Rootstock:

Address: [0x813722E1244b608a8d60fD5090C68bF6Ac12b602](https://)
Branch: /rootstock
