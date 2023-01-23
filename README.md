This is an technical assesment for mirtech

## Development

1. Clone project

   ```bash
   git clone https://github.com/jandranrebbalangue/CRM_Mirtech.git
   cd CRM_Mirtech
   ```

2. Install dependencies

   ```bash
   yarn
   ```

3. Install mongodb through docker

   ```bash
   yarn run db
   ```

4. Create .env and put this inside .env `DATABASE_URL=mongodb://root:password@localhost:27017/crm-local?authSource=admin`

5. Start app

   ```bash
   yarn run dev
   ```

6. To generate seed data run

   ```bash
   yarn run seed
   ```

7. You can access mongodb gui through http://localhost:4321/

   You can access now the application through http://localhost:3000/
