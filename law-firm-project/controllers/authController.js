import bcrypt from 'bcrypt'
import {findByEmail} from '../models/userModels.js';


export const login = async (req,res) =>{
    try{

        const {email, password} = req.body;
        console.log(`From backend Email=${email} Password=${password}`)
        if(!email){
            return res.status(400).json({message: 'Email is required'})
        }else if(!password){
            return res.status(400).json({message: 'Password is required'})
        }

        const user = await findByEmail(email);
        if (!user) return res.status(401).json({ message: 'Invalid email' });

        const success = await bcrypt.compare(password, user.password);
        if (!success) return res.status(401).json({ message: 'Invalid password' });

        req.session.user = { admin_id: user.admin_id, email: user.email_address, role: user.role };
        res.json({ success: true, message:'Log in successfully' , user: req.session.user });

    }catch(err){
        console.log(err)
        res.json({success: false, message: `Error occured, please try again later. ${err}`})

    }
}

export const logout = async (req,res) => {

    req.session.destroy((err) => {
        if(err) return res.status(500).json({success: false, message: `Log out failed`});
        res.clearCookie('sid');
        res.json({ success: true });

    })

}

export const me = async (req,res) => {
    if (req.session?.user) return res.json(req.session.user);
    res.status(401).json({ success:false , message: 'Not logged in' });

}
