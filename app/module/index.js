const { AdminPanelUserToken } = require('./storage/models/adminPanelUserToken')
const { AdminPanelUser } = require('./storage/models/adminPanelUser');
const { GreenHouse } = require('./storage/models/greenHouse');
const { Room } = require('./storage/models/room');
const { Space } = require('./storage/models/space');
const { Calendar } = require('./storage/models/calendar');
const { Journal } = require('./storage/models/journal');
const { Settings } = require("./storage/models/settings");

 Space.hasMany(Room, {
    foreignKey: 'spaceId',
    as: 'room',
 });

 Room.belongsTo(Space, {
    foreignKey: 'spaceId',
    as: 'space',
 });

 Room.hasMany(GreenHouse, {
    foreignKey: 'roomId',
    as: 'greenHouse',
 });

 GreenHouse.belongsTo(Room, {
    foreignKey: 'roomId',
    as: 'room',
 });

 Space.hasMany(AdminPanelUser, {
    foreignKey: 'spaceId',
    as: 'adminPanelUser'
 });

 AdminPanelUser.belongsTo(Space, {
    foreignKey: 'spaceId',
    as: 'space',
 });

module.exports = {
    AdminPanelUserToken,
    AdminPanelUser,
    GreenHouse,
    Room,
    Space,
    Calendar,
    Journal,
    Settings
}
