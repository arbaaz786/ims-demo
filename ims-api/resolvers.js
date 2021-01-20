import Note from './models/note';
import Entry from './models/entry';
import Jdentbuyer from './models/jdentbuyer';
export const resolvers = {
  Query: {
    async getNote(root, { _id }) {
      return await Note.findById(_id);
    },
    async allNotes() {
      return await Note.find();
    },
    async getEntry(root, { _id }) {
      return await Entry.findById(_id);
    },
    async allEntries() {
      return await Entry.find();
    },
    async getJdentBuyer(root, { _id }) {
      return await Jdentbuyer.findById(_id);
    },
    async allJdentBuyers() {
      return await Jdentbuyer.find();
    },
  },
  Mutation: {
    async createNote(root, { input }) {
      return await Note.create(input);
    },
    async updateNote(root, { _id, input }) {
      console.log('updateNote', input);
      return await Note.findOneAndUpdate({ _id }, input, { new: true });
    },
    async deleteNote(root, { _id }) {
      return await Note.findOneAndRemove({ _id });
    },
    async createEntry(root, { input }) {
      return await Entry.create(input);
    },
    async updateEntry(root, { _id, input }) {
      return await Entry.findOneAndUpdate({ _id }, input, { new: true });
    },
    async deleteEntry(root, { _id }) {
      return await Entry.findOneAndRemove({ _id });
    },
    async createBuyer(root, { input }) {
      return await Jdentbuyer.create(input);
    },
    async updateBuyer(root, { _id, input }) {
      console.log('Update Buyer', input);
      return await Jdentbuyer.findOneAndUpdate({ _id }, input, { new: true });
    },
    async deleteBuyer(root, { _id }) {
      return await Jdentbuyer.findOneAndRemove({ _id });
    },
  },
};
