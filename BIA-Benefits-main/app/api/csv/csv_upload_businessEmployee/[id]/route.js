import EMP from "@/models/employeeSchema";
import connectDB from "@/utils/connectDB";

export const POST = async (request, {params}) => {
    try {
      await connectDB();
      const jsonData = await request.json();
      const employeeData = jsonData.map(({ employee_ui, name, street, city, province, postal_code, email, status }) => {
        return {
          employee_ui,
          name,
          street,
          city,
          province,
          postal_code,
          email,
          status
        };
      });

      const business = await EMP.findById(params.id);
      
      if (!business) {
        return new Response(
          JSON.stringify({ message: 'No business found with this id.' }),
          { status: 400 }
        );
      }
  
        EMP.findOneAndUpdate(
          { _id: params.id },
          { $push: { employees: { $each: employeeData } } },
          { new: true }
        )
          .then((updatedDocument) => {
            if (!updatedDocument) {
              console.log('Document not found.');
            } else {
              console.log('Data inserted successfully:', updatedDocument);
            }
          })
    
      await business.save();
  
      return new Response(JSON.stringify(business), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(
          JSON.stringify({ message: error.message }),
          { status: 400 }
      );
    }
  }