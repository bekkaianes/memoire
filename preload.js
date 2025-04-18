const { contextBridge, ipcRenderer } = require("electron");
const testmgr = require('./models/testmgr'); 

console.log("Preload script loaded successfully!");

const getNames = () => {
    return testmgr.getNames();
}

const addEtat = (etatName, etatPrice) => {
    return testmgr.addEtat(etatName, etatPrice);
}


const removeEtat = (etatNum) => {
    return testmgr.removeEtat(etatNum);
}
const updateEtatPrice = (etatNum, newPrice) => {
    return testmgr.updateEtatPrice(etatNum, newPrice);
}
const addBinInf = (binificaireNom, binificairePrenom, binificaireAge, binificaireId, binificaireTel, binificaireJob, binificaireBaladiya,etatName, binificaireChild, binificaireSickChild, binificairePartner,binificairePartnerId, organisationName, binificaireAmount) => {
    return testmgr.addBinInf(binificaireNom, binificairePrenom, binificaireAge, binificaireId, binificaireTel, binificaireJob, binificaireBaladiya,etatName, binificaireChild, binificaireSickChild, binificairePartner,binificairePartnerId, organisationName, binificaireAmount);
}
const getBinInf = () => {
    return testmgr.getBinInf();
}
const removeBinInf = (binificaireNum) => {
    return testmgr.removeBinInf(binificaireNum);
}
const addBaladiya = (binificaireBaladiya) => {
    return testmgr.addBaladiya(binificaireBaladiya);
}
const getBaladiya = () => {
    return testmgr.getBaladiya();
}
const removeBaladiya = (baladiyaNum) => {
    return testmgr.removeBaladiya(baladiyaNum);
}
const addOrg = (binificaireBaladiya, organisationName, organisationType, responsableName) => {
    return testmgr.addOrg(binificaireBaladiya, organisationName, organisationType, responsableName);
}

const getOrganisations = () => {
    return testmgr.getOrganisations();
}
const addResponsable = (responsableName, responsableTel, responsableEmail) => {
    return testmgr.addResponsable(responsableName, responsableTel, responsableEmail);
}
const getOrgInf = () => {
    return testmgr.getOrgInf();
}
const getRespInf = () => {
    return testmgr.getRespInf();
}
const removeOrganisation = (organisationNum) => {
    return testmgr.removeOrganisation(organisationNum);
}

const addMantants = (value_m) => {
    return testmgr.addMantants(value_m);
}



contextBridge.exposeInMainWorld("api", {
    getNames: getNames,

    addEtat: addEtat,
    removeEtat: removeEtat,
    updateEtatPrice: updateEtatPrice,
    addBinInf: addBinInf, 
    getBinInf: getBinInf,
    removeBinInf: removeBinInf,
    addBaladiya: addBaladiya,
    getBaladiya: getBaladiya,
    removeBaladiya: removeBaladiya,
    addOrg: addOrg,
    getOrganisations: getOrganisations,
    addResponsable: addResponsable,
    getOrgInf: getOrgInf,
    getRespInf: getRespInf,
    removeOrganisation: removeOrganisation,
    addMantants: addMantants,
});

contextBridge.exposeInMainWorld("electronAPI", {
    send: (channel, data) => ipcRenderer.send(channel, data),
    receive: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
    openBinifcaireWindow: () => ipcRenderer.send("open-binificaire-window"), // ✅ Ensure the main process listens for this
    openOrganisationWindow: () => ipcRenderer.send("open-organisation-window"), // ✅ Ensure the main process listens for this
    openMantantWindow: () => ipcRenderer.send("open-mantant-window"),
});

