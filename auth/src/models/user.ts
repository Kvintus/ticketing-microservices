import mongoose from 'mongoose'
import { Password } from '../services/password';

export interface UserAttrs {
  email: string,
  password: string,
}

export interface UserModel extends mongoose.Model<any> {
  build: (user: UserAttrs) => UserDocument;
} 

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  }
}, {
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
    },
    versionKey: false,
  }
})

userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed)
  }
  done();
})

userSchema.statics.build = (user: UserAttrs) => new User(user); 

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);
export { User }